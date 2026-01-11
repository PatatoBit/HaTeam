// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

Deno.serve(async () => {
  // Find orphaned files: in storage.objects but not in your_table.image_url
  const { data: orphans } = await supabase.rpc("find_orphaned_files", {
    max_age_hours: 24,
    table_name: "posts",
    image_url_column: "image_url",
  });

  if (!orphans?.length) {
    return new Response("No orphans found", { status: 200 });
  }

  // Delete files (storage.objects auto-syncs with S3)
  const bucket = "posters";
  const deletePromises = orphans.map(async (file: { name: string }) => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([file.name]);
    if (error) console.error(`Failed to delete ${file.name}:`, error);
  });

  await Promise.allSettled(deletePromises);

  console.log(`Cleaned up ${orphans.length} orphaned files`);
  return new Response(JSON.stringify({ deleted: orphans.length }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
