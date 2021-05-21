# frozen_string_literal: true

module Api
  module V1
    class UserInterestsController < Api::V1::ApplicationController
      def create
        interests = Interest.where(id: params[:interest_ids])
        UserInterest.transaction do
          current_user.user_interests.destroy_all
          interests.each do |interest|
            user_interest = current_user.user_interests.build(interest: interest)
            user_interest.save!
          end
        end

        head :created
      end
    end
  end
end
