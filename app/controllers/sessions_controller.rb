# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: %i[create authenticate]
  before_action :authenticate_user!, only: [:authenticate]

  respond_to :json

  def create
    super { |resource| @resource = resource }
  end

  def authenticate
    render json: current_user
  end

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end
