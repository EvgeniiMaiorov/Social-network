# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }, defaults: { format: :json }
  root 'pages#index'
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      # resources :users, exclude: %i[new edit]
    end
  end
  get '*path', to: 'pages#index', via: :all
end
