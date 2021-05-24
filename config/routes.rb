# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }, defaults: { format: :json }

  root 'pages#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      scope :users do
        patch :update_user_interests, to: 'users#update_user_interests'
      end

      resources :interest_categories, only: [:index]
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
