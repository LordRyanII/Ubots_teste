 #Backend initialization
 Start-Process powershell -ArgumentList "-noexit", "-noprofile", "-command & {
    Write-Output '------------------------------------------'
    Write-Output 'Inicializando BACKEND'
    Write-Output '------------------------------------------'
    cd ./backend
    cd ./src
    npm install
    npm start
 }"

#Frontend initialization
Write-Output '------------------------------------------'
Write-Output 'Inicializando FRONTEND'
Write-Output '------------------------------------------'
cd ./frontend
npm install
npm run dev