# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }, defaults: { format: :json }

  root 'pages#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      # resources :users, exclude: %i[new edit]

      get :current_user, to: 'users#user'

      resources :user_interests, only: [:create]
      resources :interest_categories
      resources :interests, only: [:index]
      resources :invitations do
        member do
          patch :accept
          patch :reject
        end
      end
    end
  end
  get '*path', to: 'pages#index', via: :all
end
