# frozen_string_literal: true

FactoryBot.define do
  factory :invitation do
    trait :accepted do
      status { 'accepted' }
    end

    trait :rejected do
      status { 'rejected' }
    end

    trait :pending do
      status { 'pending' }
    end
  end
end
