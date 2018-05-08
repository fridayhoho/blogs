function plotData(X, y)
%PLOTDATA Plots the data points X and y into a new figure
%   PLOTDATA(x,y) plots the data points with + for the positive examples
%   and o for the negative examples. X is assumed to be a Mx2 matrix.

% Create New Figure
figure; hold on;

% ====================== YOUR CODE HERE ======================
% Instructions: Plot the positive and negative examples on a
%               2D plot, using the option 'k+' for the positive
%               examples and 'ko' for the negative examples.
%

admitPos = find(y==1);
notAdmitPos = find(y == 0);
plot(X(admitPos ,1), X(admitPos ,2), "*", 'markersize', 8);
hold on;
plot(X(notAdmitPos ,1), X(notAdmitPos ,2), "or", 'MarkerFaceColor','r', 'markersize', 8);







% =========================================================================



hold off;

end
