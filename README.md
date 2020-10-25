# Tools for Your NodeJS Project
This respository is a simple REST API using NodeJS and Koa used to demonstrate some tools in the NodeJS ecosystem. If you're not familiar with this sytem, you can reference the project created from our previous lesson, [Rest API Design](https://github.com/CodeSeoul/rest-api-design).

## Setup
We're assuming you've already installed Docker. If you haven't, you should go do that now.
### Windows

### OS X
1. Install Brew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
    * It will output some directions when it finishes. You should follow them.
2. Install tools from Brewfile: `brew bundle`
    * For direnv to work, you need to setup the hook...
        * bash: `eval "$(direnv hook bash)"`
        * zsh: `eval "$(direnv hook zsh)"`
        * fish: `eval (direnv hook fish)`
        * Not sure which shell you're using? Run `echo "${SHELL}"`

### Linux / WSL
1. Install Brew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
    * It will output some directions when it finishes. You should follow them.
2. Install tools from Brewfile: `brew bundle`
    * For direnv to work, you need to setup the hook...
        * bash: `eval "$(direnv hook bash)" && echo eval "$(direnv hook bash)" >> ~/.bashrc`
        * zsh: `eval "$(direnv hook zsh)" && echo eval "$(direnv hook bash)" >> ~/.zshrc`
        * fish: `eval (direnv hook fish) && echo eval "(direnv hook bash)" >> ~/.config/fish/config.fish`
        * Not sure which shell you're using? Run `echo "${SHELL}"`
3. (Assuming Ubuntu) Install Docker: 
    ```
    sudo apt-get update
    sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    ```
4. Install docker-compose: `sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
5. Run `npm install`

## How to Run
The server will not run in its current state. You should check out the `tools` branch to see the complete version. The master branch is only used as a start point.
* Use `npm run start` to run the Koa server

## Tools We'll Cover
### Code Management
* [Husky](https://typicode.github.io/husky/#/)
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [EditorConfig](https://editorconfig.org/)
### Testing
* [Jest](https://jestjs.io/)
* [Supertest](https://github.com/visionmedia/supertest)
* [CodeCov](https://codecov.io/)
### Environment Management
* [Docker / docker-compose](https://www.docker.com/)
* [Direnv](https://direnv.net/)
* [nodemon](https://nodemon.io/)
### Other
* [Homebrew](https://brew.sh/) (OS X / Linux) / [Choco](https://chocolatey.org/) (Windows)
* [JSDoc](https://jsdoc.app/)
