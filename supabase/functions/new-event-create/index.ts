// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("new event create function loaded");

Deno.serve(async (req) => {
  const {
    image,
    name,
    event_link,
    open_date,
    open_time,
    close_date,
    close_time,
    fee_amount,
    min_age,
    max_age,
  } = await req.json();

  console.log("Request received with data:", {
    image,
    name,
    event_link,
    open_date,
    open_time,
    close_date,
    close_time,
    fee_amount,
    min_age,
    max_age,
  });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Insert the new event into the "events" table
  const { error } = await supabase.from("events").insert([
    {
      image_url: "https://placehold.co/400x500",
      name,
      url: event_link,
      open_at: `${open_date}T${open_time}`,
      close_at: `${close_date}T${close_time}`,
      cost: fee_amount,
      min_age,
      max_age,
    },
  ]);

  if (error) {
    console.error("Error inserting new event:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create event" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const data = {
    message: `Event "${name}" created successfully!`,
  };

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/new-event-create' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
