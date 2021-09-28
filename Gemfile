# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.0'

gem 'activeadmin', '~> 2.9'
gem 'active_model_serializers', '~> 0.10.0'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'carrierwave', '~> 2.0'
gem 'devise'
gem 'devise-jwt'
gem 'jbuilder', '~> 2.7'
gem 'omniauth-google-oauth2'
gem 'pg'
gem 'puma', '~> 4.1'
gem 'rails', '~> 6.0.3', '>= 6.0.3.5'
gem 'sass-rails', '>= 6'
gem 'searchkick', '~> 4.5'
gem 'sidekiq', '~> 6.2', '>= 6.2.1'
gem 'sidekiq-scheduler', '~> 3.1'
gem 'webpacker', '~> 4.0'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails', '~> 2.7', '>= 2.7.6'
  gem 'faker'
  gem 'pry-rails'
  gem 'rails-controller-testing', '~> 1.0', '>= 1.0.5'
  gem 'rspec-rails', '~> 5.0', '>= 5.0.2'
end

group :development do
  gem 'letter_opener', '~> 1.7'
  gem 'listen', '~> 3.2'
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'factory_bot_rails', '~> 6.2'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
