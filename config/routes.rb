# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  authenticate :admin_user do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: 'registrations',
    omniauth_callbacks: 'omniauth_callbacks'
  }, defaults: { format: :json }

  root 'pages#index'

  namespace :admin do
    post :login_as, to: 'impersonations#login_as'
  end

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :users, except: %i[new edit create] do
        patch :update_user_interests, on: :collection
        patch :online_since, on: :collection
        patch :location, on: :collection
        get :online_status, on: :collection
        resources :posts, only: %i[index create]
      end

      resources :posts, only: %i[show update destroy] do
        post :like, on: :member
        get :feed, on: :collection
        get :friends_posts, on: :collection
        resources :comments, shallow: true
      end

      resources :interest_categories, only: [:index]
      get :interests, to: 'interests#index'
      get :activities, to: 'activities#index'

      resources :invitations do
        member do
          patch :accept
          patch :reject
        end
      end

      resources :tags, only: [:index]
      resources :conversations, only: %i[index create show]
      resources :messages, only: %i[index create]
    end
  end
  get '*path', to: 'pages#index', via: :all
end
