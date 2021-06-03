# frozen_string_literal: true

module Api
  module V1
    class InterestsController < Api::V1::ApplicationController
      def index
        interests = current_user.interests

        render json: interests
      end
    end
  end
end
