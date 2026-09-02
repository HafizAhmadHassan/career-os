const { execSync } = require('child_process');

function executeBuild() {
    execSync('npm run build', { stdio: 'inherit' });
}

function checkGitStatus() {
  const status = execSync('git status --porcelain', { encoding: 'utf-8' })
  console.log('Git status:', status || 'Clean')
}

function main() {
  console.log('=== Career OS Build Script ===\n')
  
  console.log('1. Installing dependencies...')
  execSync('npm install', { stdio: 'inherit' })
  
  console.log('\n2. Running TypeScript check...')
  try {
    execSync('npx tsc -b --noEmit', { stdio: 'inherit' })
    console.log('TypeScript check passed!')
  } catch (e) {
    console.log('TypeScript errors found, but continuing...')
  }
  
  console.log('\n3. Building project...')
  executeBuild()
  
  console.log('\n4. Checking git status...')
  checkGitStatus()
  
  console.log('\n=== Build Complete ===')
  console.log('To deploy:')
  console.log('  git add .')
  console.log('  git commit -m "Deploy career-os"')
  console.log('  git push origin main')
  console.log('\nGitHub Actions will deploy automatically!')
}

main()