const { Pool } = require('pg');

// قاعدة البيانات المحلية
const localPool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres', // جربي: postgres, admin, 1234
  database: 'project_management',
  port: 5432,
});

// قاعدة بيانات Neon
const neonPool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_zC4lYTLh1ZWg@ep-lingering-field-aezcuk5l-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require',
});

async function migrateData() {
  try {
    console.log('📊 جاري قراءة البيانات من قاعدة البيانات المحلية...');
    
    // قراءة المشاريع
    const projectsResult = await localPool.query('SELECT * FROM projects ORDER BY id');
    console.log(`✅ تم العثور على ${projectsResult.rows.length} مشروع`);

    // قراءة الدروس المستفادة
    const lessonsResult = await localPool.query('SELECT * FROM lessons_learned ORDER BY id');
    console.log(`✅ تم العثور على ${lessonsResult.rows.length} درس مستفاد`);

    console.log('\n📤 جاري نقل البيانات إلى Neon...');

    // نقل المشاريع
    for (const project of projectsResult.rows) {
      await neonPool.query(`
        INSERT INTO projects (id, name, description, estimated_budget, duration_in_weeks, stage, created_at, updated_at, data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          estimated_budget = EXCLUDED.estimated_budget,
          duration_in_weeks = EXCLUDED.duration_in_weeks,
          stage = EXCLUDED.stage,
          updated_at = EXCLUDED.updated_at,
          data = EXCLUDED.data
      `, [
        project.id,
        project.name,
        project.description,
        project.estimated_budget,
        project.duration_in_weeks,
        project.stage,
        project.created_at,
        project.updated_at,
        project.data
      ]);
    }
    console.log(`✅ تم نقل ${projectsResult.rows.length} مشروع بنجاح`);

    // نقل الدروس المستفادة
    for (const lesson of lessonsResult.rows) {
      // تخطي الدروس التي لا تحتوي على عنوان
      if (!lesson.lesson_title) {
        console.log(`⚠️ تم تخطي درس بدون عنوان (ID: ${lesson.id})`);
        continue;
      }
      
      await neonPool.query(`
        INSERT INTO lessons_learned (id, project_id, lesson_title, lesson_description, category, impact_level, recommendations, created_at, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          lesson_title = EXCLUDED.lesson_title,
          lesson_description = EXCLUDED.lesson_description,
          category = EXCLUDED.category,
          impact_level = EXCLUDED.impact_level,
          recommendations = EXCLUDED.recommendations
      `, [
        lesson.id,
        lesson.project_id,
        lesson.lesson_title,
        lesson.lesson_description,
        lesson.category,
        lesson.impact_level,
        lesson.recommendations,
        lesson.created_at,
        lesson.created_by
      ]);
    }
    console.log(`✅ تم نقل ${lessonsResult.rows.length} درس مستفاد بنجاح`);

    // تحديث sequences
    await neonPool.query(`
      SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
      SELECT setval('lessons_learned_id_seq', (SELECT MAX(id) FROM lessons_learned));
    `);

    console.log('\n🎉 تم نقل جميع البيانات بنجاح!');
    
  } catch (error) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await localPool.end();
    await neonPool.end();
  }
}

migrateData();
