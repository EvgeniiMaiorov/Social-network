# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#index'
  post '/auth', to: 'pages#auth'
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :users, exclude: %i[new edit]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
