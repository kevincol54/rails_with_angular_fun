class WelcomeController < ApplicationController
  def index
  end

  def dashboard
  end

  def choose_layout
    user_signed_in? ? "angular" : "application"
  end
end
