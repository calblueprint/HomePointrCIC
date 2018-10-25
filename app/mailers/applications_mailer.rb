class ApplicationsMailer < ApplicationMailer
	def new_application
    @application = params[:application]
    @url = "http://localhost:1337"
    mail(to: @application.property.landlord.email, subject: '[Homepointr] New Application For Your Property.')
  end
end
