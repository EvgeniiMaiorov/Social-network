# frozen_string_literal: true

class InterestSerializer < ActiveModel::Serializer
  attributes :id, :name, :interest_category_id
end
