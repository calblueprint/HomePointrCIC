class ApplicationController < ActionController::Base
	include Pundit
	after_action :verify_authorized
end
