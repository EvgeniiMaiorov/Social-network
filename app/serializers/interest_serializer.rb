# frozen_string_literal: true

class InterestSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :interest_category_id
end
