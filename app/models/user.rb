class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :emails
  validates :name, :emails, :type, :address, :phone, presence: true
  validates :type, inclusion: { in: ["Landlord", "ReferralAgency"] }
  devise :multi_email_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, 
         :multi_email_confirmable, :multi_email_validatable

	def will_save_change_to_email?
	end
end
