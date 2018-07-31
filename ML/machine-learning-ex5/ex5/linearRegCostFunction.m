    function [J, grad] = linearRegCostFunction(X, y, theta, lambda)
%LINEARREGCOSTFUNCTION Compute cost and gradient for regularized linear
%regression with multiple variables
%   [J, grad] = LINEARREGCOSTFUNCTION(X, y, theta, lambda) computes the
%   cost of using theta as the parameter for linear regression to fit the
%   data points in X and y. Returns the cost in J and the gradient in grad

% Initialize some useful values
m = length(y); % number of training examples
n = size(X, 2)
% You need to return the following variables correctly
J = 0;
grad = zeros(size(theta)); % 2 * 1


%sizeX = size(X)
sizeTheta = size(theta)

sigmoid = X * theta;
diff = (sigmoid - y).^2;
summary = sum(diff)/(2*m);

theta2end = theta(2:end);

regularized_part = (lambda/(m*2)) * sum(theta2end.^2);

J = summary + regularized_part;



% grad0 = (1/m)* sum( ( sigmoid - y )' * X );
% grad1 = (1/m)* sum( ( sigmoid - y )' * X(:,2) ) + (lambda/m)*theta2end;


% grad(1,1) = grad0;
% grad(2, 1) = grad1;


grad
% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost and gradient of regularized linear
%               regression for a particular choice of theta.
%
%               You should set J to the cost and grad to the gradient.
%












% =========================================================================

grad = grad(:);

end
