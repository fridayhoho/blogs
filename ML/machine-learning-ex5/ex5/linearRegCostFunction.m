function [J, grad] = linearRegCostFunction(X, y, theta, lambda)
%LINEARREGCOSTFUNCTION Compute cost and gradient for regularized linear
%regression with multiple variables
%   [J, grad] = LINEARREGCOSTFUNCTION(X, y, theta, lambda) computes the
%   cost of using theta as the parameter for linear regression to fit the
%   data points in X and y. Returns the cost in J and the gradient in grad

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly
J = 0;
grad = zeros(size(theta));
% X = [ones(m, 1) X];

sigmoid = theta * X';
diff = (sigmoid - y)^2;
summary = sum(diff)/(2*m);

theta0 = [0 ; theta(2:end)];

regularized_part = (lambda/m)*n + sum(theta0.^2);

J = summary + regularized_part;

theta0 = (1/m)* sum( ( sigmoid - y )' * X );
theta1 = (1/m)* sum( ( sigmoid - y )' * X(:,2) ) + (lambda/m)*theta;

theta(1, 1) = theta0;
theta(2, 1) = theta1;

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost and gradient of regularized linear
%               regression for a particular choice of theta.
%
%               You should set J to the cost and grad to the gradient.
%












% =========================================================================

grad = grad(:);

end
