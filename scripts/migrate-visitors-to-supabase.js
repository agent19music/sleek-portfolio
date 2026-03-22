/**
 * Migration script: Transfer visitor records from Neon to Supabase
 * Run with: node scripts/migrate-visitors-to-supabase.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');

async function migrate() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const neonUrl = process.env.DATABASE_URL;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)');
    process.exit(1);
  }

  if (!neonUrl) {
    console.error('❌ Missing Neon connection string (DATABASE_URL)');
    process.exit(1);
  }

  console.log('🔄 Starting visitor data migration from Neon to Supabase...\n');

  try {
    // Connect to Neon
    const neonClient = new Client({
      connectionString: neonUrl,
    });
    await neonClient.connect();
    console.log('✅ Connected to Neon');

    // Connect to Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Connected to Supabase\n');

    // Query visitors from Neon
    const neonResult = await neonClient.query('SELECT visitor_id, created_at FROM visitors ORDER BY id ASC');
    const visitorCount = neonResult.rows.length;

    if (visitorCount === 0) {
      console.log('ℹ️  No visitors found in Neon database.');
      await neonClient.end();
      return;
    }

    console.log(`📊 Found ${visitorCount} visitor record(s) in Neon`);
    console.log('🚀 Inserting into Supabase...\n');

    // Prepare data for Supabase (batch insert)
    const visitorData = neonResult.rows.map((row) => ({
      visitor_id: row.visitor_id,
      created_at: row.created_at,
    }));

    // Insert in batches to avoid overwhelming the API
    const batchSize = 100;
    let inserted = 0;

    for (let i = 0; i < visitorData.length; i += batchSize) {
      const batch = visitorData.slice(i, i + batchSize);

      const { error } = await supabase.from('visitors').insert(batch);

      if (error) {
        console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        await neonClient.end();
        process.exit(1);
      }

      inserted += batch.length;
      console.log(`✓ Inserted ${inserted}/${visitorCount} records`);
    }

    console.log(`\n✅ Migration complete! ${inserted} visitor record(s) transferred to Supabase.`);

    // Verify the count in Supabase
    const { count, error: countError } = await supabase
      .from('visitors')
      .select('*', { head: true, count: 'exact' });

    if (!countError) {
      console.log(`📈 Supabase visitors table now contains: ${count} record(s)`);
    }

    await neonClient.end();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
