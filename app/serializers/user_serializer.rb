# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :photo, :location

  attribute :online do
    object.online?
  end

  has_many :interests
end
