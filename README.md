# file-server-angular
The front-end of a file server, built with Angular.

## 2. Start Server
```sh
npm start
```

## 3. Build
```sh
npm run build
```

## 4. Docker
Build for production. All the compiled html files and js files will be generated in `dist`.
```sh
npm run build
```
Create image with nginx.
```sh
docker build -t jojozhuang/file-server-angular .
```
Create container for stand alone deployment.
```sh
docker run --name file-server-angular -p 12021:80 -d jojozhuang/file-server-angular
```
Access `http://localhost:12021/` in browser.

Or deploy together with backend `file-node-server`. Copy the compiles files in `dist` to backend server and serve them as static files.