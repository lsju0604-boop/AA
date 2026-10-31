@echo off
chcp 65001 > nul
echo ==============================================
echo        GitHub 자동 푸시를 시작합니다
echo ==============================================

echo.
echo [1/4] 변경된 파일들을 장바구니에 담는 중 (git add .)...
git add .

echo.
echo [2/4] 커밋(저장 기록)을 생성하는 중 (git commit)...
git commit -m "feat: 프로젝트 업데이트 및 깃 푸시"

echo.
echo [3/4] 원격 저장소 및 main 브랜치 설정 중...
git remote add origin https://github.com/lsju0604-boop/akak.git 2>nul
git branch -M main

echo.
echo [4/4] GitHub로 파일 전송 중 (git push)...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ==============================================
    echo  [성공] GitHub 푸시가 완료되었습니다!
    echo ==============================================
) else (
    echo ==============================================
    echo  [안내] 로그인을 묻거나 오류가 발생했습니다.
    echo  브라우저 로그인 팝업이 뜨면 승인해 주세요.
    echo ==============================================
)

echo.
echo 아무 키나 누르면 창이 닫힙니다.
pause > nul
