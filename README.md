# Repro Steps
- `cd ./appshell` and run `npm i` and then `npm run build`
- `cd ../someapp` and run `dotnet build`
- `cd ../piral~/Someapp` and run `npm start`

#  Problem
When you want to open `http://localhost:1234/someapp` the loading spinner does not go away.