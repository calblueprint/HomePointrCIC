class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  validates :name, :email, :type, :address, :phone, presence: true
  validates :email, format: { with: Devise.email_regexp }
  validates :type, inclusion: { in: ["Landlord", "ReferralAgency"] }
end
