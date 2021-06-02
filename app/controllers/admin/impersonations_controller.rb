# frozen_string_literal: true

module Admin
  class ImpersonationsController < Admin::ApplicationController
    def login_as
      user = User.find(params[:id])
      token = Warden::JWTAuth::UserEncoder.new.call(user, :users, nil).first
      redirect_to root_path(token: "Bearer #{token}")
    end
  end
end
