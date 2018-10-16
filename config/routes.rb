Rails.application.routes.draw do
  post 'referral_agencies/create', to: 'referral_agencies#create'
  get 'referral_agencies/show', to: 'referral_agencies#show'
  patch 'referral_agencies/update', to: 'referral_agencies#update'
  get 'referral_agencies/delete', to: 'referral_agencies#delete'
  post 'landlords/create', to: 'landlords#create'
  get 'landlords/show', to: 'landlords#show'
  patch 'landlords/update', to: 'landlords#update'
  get 'landlords/delete', to: 'landlords#delete'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
