# frozen_string_literal: true

class ApplicationsMailer < ApplicationMailer
  def new_application
    @application = params[:application]
    @url = ENV['MAIL_HOST']
    mail(to: @application.property.landlord.email, subject: '[Homepointr] New Application For Your Property.')
  end
end
