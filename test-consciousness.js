const { chromium } = require('playwright');

async function testConsciousnessScrollytelling() {
  console.log('🚀 Starting Consciousness Scrollytelling Test...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate to the site
    console.log('📍 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Check if the page loads without errors
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    // Test Hero Section
    console.log('🧠 Testing Hero Consciousness section...');
    const heroTitle = await page.textContent('h1').catch(() => null);
    if (heroTitle && heroTitle.includes('What makes us human')) {
      console.log('✅ Hero title found: "What makes us human?"');
    } else {
      console.log('❌ Hero title not found or incorrect');
    }
    
    // Test if sections are present
    const scenarios = [
      'The Rise of Solipsism',
      'Divergent Futures', 
      'Performative Consciousness',
      'The Empathy Olympics',
      'Neo-Romanticism',
      'The Human Consciousness Test'
    ];
    
    console.log('📊 Testing scenario sections...');
    let foundSections = 0;
    
    for (const scenario of scenarios) {
      const found = await page.locator(`text="${scenario}"`).count() > 0;
      if (found) {
        console.log(`✅ Found: ${scenario}`);
        foundSections++;
      } else {
        console.log(`❌ Missing: ${scenario}`);
      }
    }
    
    console.log(`📈 Found ${foundSections}/${scenarios.length} scenario sections`);
    
    // Test interactive elements
    console.log('🎮 Testing interactive elements...');
    
    // Check for profession cards (if visible)
    const professionCards = await page.locator('[class*="profession"]').count();
    console.log(`🏢 Found ${professionCards} profession-related elements`);
    
    // Check for charts (canvas elements)
    const charts = await page.locator('canvas').count();
    console.log(`📊 Found ${charts} chart canvas elements`);
    
    // Test scrolling behavior
    console.log('📜 Testing scroll behavior...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000);
    
    console.log('✅ Scroll test completed');
    
    // Check for JavaScript errors
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    if (errors.length === 0) {
      console.log('✅ No JavaScript errors detected');
    } else {
      console.log(`❌ Found ${errors.length} JavaScript errors:`);
      errors.forEach(error => console.log(`   - ${error}`));
    }
    
    // Final assessment
    const score = foundSections / scenarios.length * 100;
    console.log(`\n🎯 Test Results Summary:`);
    console.log(`   - Sections found: ${foundSections}/${scenarios.length} (${score.toFixed(1)}%)`);
    console.log(`   - Interactive elements: ${professionCards + charts}`);
    console.log(`   - JavaScript errors: ${errors.length}`);
    
    if (score >= 80 && errors.length === 0) {
      console.log('🎉 TEST PASSED - Consciousness scrollytelling is working!');
    } else if (score >= 50) {
      console.log('⚠️  TEST PARTIAL - Some issues detected but core functionality works');
    } else {
      console.log('❌ TEST FAILED - Major issues detected');
    }
    
  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
  } finally {
    await browser.close();
    console.log('🏁 Test completed');
  }
}

// Run the test
testConsciousnessScrollytelling().catch(console.error);