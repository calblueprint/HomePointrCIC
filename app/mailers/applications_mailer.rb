class ApplicationsMailer < ApplicationMailer
	def new_application
    @application = params[:application]
    @url = "https://homepointr.herokuapp.com/"
    mail(to: @application.property.landlord.email, subject: '[Homepointr] New Application For Your Property.')
  end
end
