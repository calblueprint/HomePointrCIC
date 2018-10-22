Rails.application.routes.draw do
  resources :referral_agencies, :only => [:create, :show, :update, :destroy] 
  resources :landlords, :only => [:create, :show, :update, :destroy]
  devise_for :users


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
