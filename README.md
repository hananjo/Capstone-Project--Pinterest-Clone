# PinReact Project

# Technologies Used:

## Frontend:

- React, Redux, Javascript

## Backend:

- Python, SQLAlchemey

## Hosting and Deployement:

- Render

# Link to Live Site:

https://pinreact-capstone-project.onrender.com

# Project Summary:

This project is a Pinterest clone, aiming to replicate the core features and user experience of this popular website. This platform provides a vision board type experience where the user can find pictures that they find both inspiring and visulally appealing. The user can discover and save pins into a custom created board. Users may also leave comments on pins they like. One notable element, which makes the user experience much more powerful, is the search feature. Users have the ability to search for keywords that are associated with the pins they desire to see.

## Login:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690313418/Screen_Shot_2023-07-25_at_12.28.04_PM_bixync.png)

To access the full functionality of the PinReact page, a user can click the top left profile user button, which has a drop down menu with a 'Log in' button. Once the button is clicked, a log in modal will pop up with a 'Demo user' option to gain full access.

## Pins/Landing Page:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1686592123/Screen_Shot_2023-06-12_at_10.46.04_AM_qpmlct.png)

This picture shows the landing page in which a logged in or logged out user can browse through a series of pins. When logged in, a user can hover over each pin to select the red 'save' button on the pin they want to add to a board.

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242058/Screen_Shot_2023-07-24_at_4.36.53_PM_ep0sue.png)

A logged in user can create a new pin by clicking on the plus sign button on the landing and board page.

## Pins Detail Page/Comments:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242056/Screen_Shot_2023-07-24_at_4.37.29_PM_aonhy2.png)

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242056/Screen_Shot_2023-07-24_at_4.38.16_PM_ijuisi.png)

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242059/Screen_Shot_2023-07-24_at_4.38.40_PM_caesuu.png)

In the images above, we have the pin detail page in which logged in users can edit and delete the user's created pin. If the user doesn't own the pin, the edit and delete buttons will be hidden to show only the image, name, description, and comments.

A user can also add, update and delete comments on all pins.

## Boards Page:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1686592115/Screen_Shot_2023-06-12_at_10.46.26_AM_n5jaqi.png)

This pictures shows the user's board page where all the different categories of boards a user has created. A user can create, update, and delete a board.

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242061/Screen_Shot_2023-07-24_at_4.35.48_PM_qfkd3n.png)

Whether you're on the landing page, search page, or on a pin detail page, a user has the option to click save (when logged in) and have a pop up modal that allows the user to save the pin in a selected board. If a desired board doesn't already exist, the user can select the 'Create new board' button to create a new one. A 'Create new board' modal allows for a newly created board to appear on the list as well as the board page.

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242060/Screen_Shot_2023-07-24_at_4.36.21_PM_xdeyuc.png)

A user can also select the board page by clicking the profile button on the top left corner of the page. A drop down menu with the user's profile picture can be clicked to direct the user to the boards page. On the baords page is a plus sign on the right side of the page, which has a drop down menu that allows the user to either create a pin or a new board.

## Search:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1690242063/Screen_Shot_2023-07-24_at_4.30.27_PM_rhmmdf.png)

A user can search whether logged in or logged out. In this picture, a logged out user is searching the keyword 'hair'. The red 'save' button only appears on pins when a user is logged in.

## Search Backend Route:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1686592264/Screen_Shot_2023-06-12_at_10.50.24_AM_dcln8w.png)

This presents the search code in the backend.

## Search Frontend Route:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1686592114/Screen_Shot_2023-06-12_at_10.48.12_AM_exxh5l.png)

Here is the route for the search feature in the frontend.

## Database Schema:

![](https://res.cloudinary.com/dwphwqyrn/image/upload/v1686421128/Screen_Shot_2023-06-10_at_11.18.23_AM_p97nwo.png)
https://dbdiagram.io/d/6463f160dca9fb07c434a0a5

## Wiki:

https://github.com/hananjo/Capstone-Project--Pinterest-Clone/wiki

## Future Implementations:

- AWS image uploads
- Drop down form validations on input lines
