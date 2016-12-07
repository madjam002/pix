Pix
===

**Do not use unless you know what you're doing - this project is a work in progress!**

Pix aims to be a self-hosted multi-user photo gallery solution similar to Google Photos. Give it a folder of photos and it will index them, so you get to stay in control of your photos on the file system.

Ongoing discussion on the future of this project at https://www.reddit.com/r/selfhosted/comments/5fwcvf/open_source_familypersonal_photo_gallery_software/


Road to v1
----------

- [x] Add folders of photos as libraries into Pix
- [x] Basic viewing of folders with thumbnails
- [x] Detail lightbox view for viewing photos
- [ ] Sorting photos by date and other sorting options
- [ ] Ability to add multiple users with access controls
- [ ] Responsive web frontend which works on mobile
- [ ] Index, generate thumbnails for, and display videos


After v1 roadmap
----------------

- Native mobile app
- Intelligent image tagging and face recognition


Try Pix
-------

Pix is not working software and is not finished, but if you still want to give it a try, it's best to install Docker and Docker Compose, clone this repository and run `docker-compose pull` and `docker-compose up -d`. Then go to `http://localhost:8080` to give it a try. You can scale the `worker` service to spread indexing and thumbnail generation across multiple cores or servers.


Building / running without Docker
--------

Take a look at the `Dockerfile` for what dependencies you need on your system:

`libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++`

Make sure you have Node >= 6 installed too.

- Clone this repo
- Run `npm install` in the root
- `cd` into `packages/pix-web`, run `npm install` and `npm run build` to build the static web assets
- `cd` into `packages/pix-server`, run `npm install` and `npm run build` to compile the server side JS
- Look at `packages/pix-server/src/config.js` to see what environment variables you need to set, or `docker-compose.yml` for examples. Make sure you have `NODE_ENV` set to `production`.
- Run server with `node server.js` and a worker instance with `node worker.js`
- Profit?


License
-------

Licensed under the AGPL License.

[View the full license here](https://raw.githubusercontent.com/madjam002/pix/master/LICENSE).
