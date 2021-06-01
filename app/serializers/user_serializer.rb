# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :photo_url
  attribute :email, unless: -> { instance_options[:email_skip] }
end
