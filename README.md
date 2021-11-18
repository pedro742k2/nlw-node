# 🚀 Live Messages React Web App

### Notes:
- This is the Backend repository of the Live Messages App, to access the Frotnend code [click here](https://github.com/pedro742k2/Live-Messages-WebApp)
- Inspired on the NLW (Next Level Week) RocketSeat online event

## Screenshots

  - Home - Not signed in
  <img width="1080" alt="home" src="https://user-images.githubusercontent.com/54741310/141704177-b0ef760c-5eb0-4a24-85d9-5113e3fb4f05.png">

  - Home - Signed In
  <img width="1080" alt="signed_in" src="https://user-images.githubusercontent.com/54741310/141704186-1fa00c4e-953d-4077-be23-093649f587dd.png">

## 📜 Description

- This is a live chat web app built with React, WebSocket protocol and OAuth authentication with GitHub.

## 📡 View demo

  Live Web App: https://nlw-live-message-app.herokuapp.com/
  
## 🏠 Setup on the local network

  - `yarn install`
  - Configure your own GitHub OAuth
    - Create a `.env` file with the `PORT`, `GITHUB_CLIENT_SECRET`, `GITHUB_CLIENT_ID` and `JWT_SECRET` constants, where the **PORT** is the desired local network port, **GITHUB_CLIENT_SECRET/ID** is the credentials of the GitHub OAuth created in the step before and the **JWT_SECRET**  is a secret for the signin token.
  - `yarn dev`

## 🤝 Contributions and feedback

  - 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or email me at pedro.manuel.peres.batista@gmail.com with the suggestion or detailed description of the problem 😀.
  - 🙌 I'll thank you for that!

## 💻 Technologies

- Frontend ([Repository](https://github.com/pedro742k2/nlw-node))
  - React
  - TypeScript
  - CSS / SCSS
  - socket.io (WebSocket protocol)
  - Axios

- Backend
  - Node.js
  - TypeScript
  - Express
  - JSON WebToken
  - Prisma
  - socket.io (WebSocket)
  - Axios

- Services
  - Github OAuth
