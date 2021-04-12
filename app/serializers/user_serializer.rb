# frozen_string_literal: true

class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :first_name, :last_name, :email, :photo_url
end
