# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }, defaults: { format: :json } do
    get 'authenticate', to: 'devise/sessions#authenticate'
  end

  devise_scope :user do
    post '/users/authenticate', to: 'sessions#authenticate'
  end

  root 'pages#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      # resources :users, exclude: %i[new edit]

      get :interests, to: 'interests#index'
      get :current_user, to: 'users#user'

      resources :interest_categories
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
