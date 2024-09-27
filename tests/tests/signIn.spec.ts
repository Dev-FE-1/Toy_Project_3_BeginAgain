import { test, expect } from '@playwright/test'

test.describe('SignIn page tests', () => {
  test('should display all elements correctly', async ({ page }) => {
    // 페이지 로드
    await page.goto('http://localhost:5173/signIn')
    await page.waitForLoadState('networkidle')

    // 로고 확인
    const mainLogo = await page.getByTestId('main-logo')
    await expect(mainLogo).toBeVisible()

    // Google 로그인 버튼 확인
    const signInButton = await page.getByText('Google 로그인')
    await expect(signInButton).toBeVisible()

    // Google 로고 확인
    const googleLogo = await page.getByTestId('google-logo')
    await expect(googleLogo).toBeVisible()

    // 저작권 텍스트 확인
    const copyrightText = await page.getByText('ⓒ MAZI. All Rights Reserved.')
    await expect(copyrightText).toBeVisible()
  })

  test('should navigate to home page on successful sign in', async ({
    page
  }) => {
    // 페이지 로드
    await page.goto('http://localhost:5173/signIn')
    await page.waitForLoadState('networkidle')

    // window 객체에 signInWithGoogleAndCreateUser 함수 모킹
    await page.evaluate(() => {
      ;(window as any).signInWithGoogleAndCreateUser = async () => {
        console.log('Mocked Google sign-in')
        return Promise.resolve() // 로그인 성공 모킹
      }
    })

    // Google 로그인 버튼 클릭
    await page.click('text=Google 로그인')

    // URL 변경 대기
    // await page.waitForURL('http://localhost:5173/', { timeout: 10000 })
    await page.waitForURL('**/', { timeout: 10000 }) // **를 사용하여 어떤 경로로든 이동하는 것을 기다림

    // 홈 페이지 URL 확인
    await expect(page).toHaveURL('http://localhost:5173/')
  })
})
