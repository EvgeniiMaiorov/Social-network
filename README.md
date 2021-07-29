# LetsTalk - social network

## About The Project

This project is part of the course iTechArt Students Lab. The goal of the project is to apply our knowledge of Ruby on Rails to build a Social Network that allows interactions between users, including the ability to create and send posts, comments and likes.
Main features:
* Autherization (including using Google)
* Google map, on wich can be found friends, users with same (90% matching) and similare (more than 50% matching) interest
* Posts with tags and comments
* Regular user and admin user roles
* Friendship request and friendsips for users

## Installation and setup

1. Download the project:
  ```
  $ git clone https://github.com/EvgeniiMaiorov/Social-network.git
  $ cd social_network
  ```
2. Install the libraries:
  ```bash
  $ # ruby dependencies
  $ bundle install

  $ # js dependencies
  $ yarn install
  ```
3. Create DB:
  ```
  $ rails db:create
  $ rails db:migrate
  ```
4. Fill the database with seeds:
  ```
  $ rails db:seed
  ```
5. Rename .env.example file in .env and set the value of the variables in it
6. Run application:
  ```
  $ rails s
  ```
7. Run Sidekiq:
 ```
 $ bundle exec sidekiq
 ```
