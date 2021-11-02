const employees = [{
    "EmployeeID": 1,
    "FullName": "Nancy Davolio",
    "Position": "Sales Representative",
    "TitleOfCourtesy": "Ms.",
    "BirthDate": "1968-12-08T00:00:00.000Z",
    "HireDate": "2011-05-01T00:00:00.000Z",
    "Address": "507 - 20th Ave. E.\r\nApt. 2A",
    "City": "Seattle",
    "Region": "WA",
    "PostalCode": "98122",
    "Country": "USA",
    "HomePhone": "(206) 555-9857",
    "Extension": "5467",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png",
    "Notes": "Education includes a BA in psychology from Colorado State University in 1990.  She also completed \"The Art of the Cold Call.\"  Nancy is a member of Toastmasters International.",
    "ReportsTo": 2,
    "StateID": 1
}, {
    "EmployeeID": 2,
    "FullName": "Andrew Fuller",
    "Position": "Vice President, Sales",
    "TitleOfCourtesy": "Dr.",
    "BirthDate": "1972-02-19T00:00:00.000Z",
    "HireDate": "2011-08-14T00:00:00.000Z",
    "Address": "908 W. Capital Way",
    "City": "Tacoma",
    "Region": "WA",
    "PostalCode": "98401",
    "Country": "USA",
    "HomePhone": "(206) 555-9482",
    "Extension": "3457",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/02.png",
    "Notes": "Andrew received his BTS commercial in 1994 and a Ph.D. in international marketing from the University of Dallas in 2001.  He is fluent in French and Italian and reads German.  He joined the company as a sales representative, was promoted to sales manager in January 2012 and to vice president of sales in March 2013.  Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.",
    "ReportsTo": null,
    "StateID": 2
}, {
    "EmployeeID": 3,
    "FullName": "Janet Leverling",
    "Position": "Sales Representative",
    "TitleOfCourtesy": "Ms.",
    "BirthDate": "1983-08-30T00:00:00.000Z",
    "HireDate": "2011-04-01T00:00:00.000Z",
    "Address": "722 Moss Bay Blvd.",
    "City": "Kirkland",
    "Region": "WA",
    "PostalCode": "98033",
    "Country": "USA",
    "HomePhone": "(206) 555-3412",
    "Extension": "3355",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/09.png",
    "Notes": "Janet has a BS degree in chemistry from Boston College (2004).  She has also completed a certificate program in food retailing management.  Janet was hired as a sales associate in 2011 and promoted to sales representative in February 2012.",
    "ReportsTo": 2,
    "StateID": 3
}, {
    "EmployeeID": 4,
    "FullName": "Margaret Peacock",
    "Position": "Sales Representative",
    "TitleOfCourtesy": "Mrs.",
    "BirthDate": "1957-09-19T00:00:00.000Z",
    "HireDate": "2012-05-03T00:00:00.000Z",
    "Address": "4110 Old Redmond Rd.",
    "City": "Redmond",
    "Region": "WA",
    "PostalCode": "98052",
    "Country": "USA",
    "HomePhone": "(206) 555-8122",
    "Extension": "5176",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/04.png",
    "Notes": "Margaret holds a BA in English literature from Concordia College (1978) and an MA from the American Institute of Culinary Arts (1986).  She was assigned to the London office temporarily from July through November 2012.",
    "ReportsTo": 2,
    "StateID": 4
}, {
    "EmployeeID": 5,
    "FullName": "Steven Buchanan",
    "Position": "Sales Manager",
    "TitleOfCourtesy": "Mr.",
    "BirthDate": "1975-03-04T00:00:00.000Z",
    "HireDate": "2012-10-17T00:00:00.000Z",
    "Address": "14 Garrett Hill",
    "City": "London",
    "Region": "UK",
    "PostalCode": "45618",
    "Country": "UK",
    "HomePhone": "(71) 555-4848",
    "Extension": "3453",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/05.png",
    "Notes": "Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree in 1996.  Upon joining the company as a sales representative in 2012, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London.  He was promoted to sales manager in March 2013.  Mr. Buchanan has completed the courses \"Successful Telemarketing\" and \"International Sales Management.\"  He is fluent in French.",
    "ReportsTo": 2,
    "StateID": 5
}, {
    "EmployeeID": 6,
    "FullName": "Michael Suyama",
    "Position": "Sales Representative",
    "TitleOfCourtesy": "Mr.",
    "BirthDate": "1983-07-02T00:00:00.000Z",
    "HireDate": "2012-10-17T00:00:00.000Z",
    "Address": "Coventry House\r\nMiner Rd.",
    "City": "London",
    "Region": "UK",
    "PostalCode": "95437",
    "Country": "UK",
    "HomePhone": "(71) 555-7773",
    "Extension": "428",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png",
    "Notes": "Michael is a graduate of Sussex University (MA, economics, 2003) and the University of California at Los Angeles (MBA, marketing, 2006). He has also taken the courses \"Multi-Cultural Selling\" and \"Time Management for the Sales Professional.\"  He is fluent in Japanese and can read and write French, Portuguese, and Spanish.",
    "ReportsTo": 5,
    "StateID": 6
}, {
    "EmployeeID": 7,
    "FullName": "Robert King",
    "Position": "Sales Representative",
    "TitleOfCourtesy": "Mr.",
    "BirthDate": "1980-05-29T00:00:00.000Z",
    "HireDate": "2012-01-02T00:00:00.000Z",
    "Address": "Edgeham Hollow\r\nWinchester Way",
    "City": "London",
    "Region": "UK",
    "PostalCode": "69742",
    "Country": "UK",
    "HomePhone": "(71) 555-5598",
    "Extension": "465",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png",
    "Notes": "Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan in 2002, the year he joined the company.  After completing a course entitled \"Selling in Europe,\" he was transferred to the London office in March 2013.",
    "ReportsTo": 5,
    "StateID": 7
}, {
    "EmployeeID": 8,
    "FullName": "Laura Callahan",
    "Position": "Inside Sales Coordinator",
    "TitleOfCourtesy": "Ms.",
    "BirthDate": "1978-01-09T00:00:00.000Z",
    "HireDate": "2012-03-05T00:00:00.000Z",
    "Address": "4726 - 11th Ave. N.E.",
    "City": "Seattle",
    "Region": "WA",
    "PostalCode": "98105",
    "Country": "USA",
    "HomePhone": "(206) 555-1189",
    "Extension": "2344",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/08.png",
    "Notes": "Laura received a BA in psychology from the University of Washington.  She has also completed a course in business French.  She reads and writes French.",
    "ReportsTo": 2,
    "StateID": 8
}, {
    "EmployeeID": 9,
    "FullName": "Brett Wade",
    "Position": "Sales Representative",
    "TitleOfCourtesy": "Mr.",
    "BirthDate": "1986-01-27T00:00:00.000Z",
    "HireDate": "2012-11-15T00:00:00.000Z",
    "Address": "7 Houndstooth Rd.",
    "City": "London",
    "Region": "UK",
    "PostalCode": "36548",
    "Country": "UK",
    "HomePhone": "(71) 555-4444",
    "Extension": "452",
    "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/03.png",
    "Notes": "Brett has a BA degree in English from St. Lawrence College.  He is fluent in French and German.",
    "ReportsTo": 5,
    "StateID": 9
}];

var states = [{
    "ID": 1,
    "Name": "Alabama"
}, {
    "ID": 2,
    "Name": "Alaska"
}, {
    "ID": 3,
    "Name": "Arizona"
}, {
    "ID": 4,
    "Name": "Arkansas"
}, {
    "ID": 5,
    "Name": "California"
}, {
    "ID": 6,
    "Name": "Colorado"
}, {
    "ID": 7,
    "Name": "Connecticut"
}, {
    "ID": 8,
    "Name": "Delaware"
}, {
    "ID": 9,
    "Name": "District of Columbia"
}, {
    "ID": 10,
    "Name": "Florida"
}, {
    "ID": 11,
    "Name": "Georgia"
}, {
    "ID": 12,
    "Name": "Hawaii"
}, {
    "ID": 13,
    "Name": "Idaho"
}, {
    "ID": 14,
    "Name": "Illinois"
}, {
    "ID": 15,
    "Name": "Indiana"
}, {
    "ID": 16,
    "Name": "Iowa"
}, {
    "ID": 17,
    "Name": "Kansas"
}, {
    "ID": 18,
    "Name": "Kentucky"
}, {
    "ID": 19,
    "Name": "Louisiana"
}, {
    "ID": 20,
    "Name": "Maine"
}, {
    "ID": 21,
    "Name": "Maryland"
}, {
    "ID": 22,
    "Name": "Massachusetts"
}, {
    "ID": 23,
    "Name": "Michigan"
}, {
    "ID": 24,
    "Name": "Minnesota"
}, {
    "ID": 25,
    "Name": "Mississippi"
}, {
    "ID": 26,
    "Name": "Missouri"
}, {
    "ID": 27,
    "Name": "Montana"
}, {
    "ID": 28,
    "Name": "Nebraska"
}, {
    "ID": 29,
    "Name": "Nevada"
}, {
    "ID": 30,
    "Name": "New Hampshire"
}, {
    "ID": 31,
    "Name": "New Jersey"
}, {
    "ID": 32,
    "Name": "New Mexico"
}, {
    "ID": 33,
    "Name": "New York"
}, {
    "ID": 34,
    "Name": "North Carolina"
}, {
    "ID": 35,
    "Name": "Ohio"
}, {
    "ID": 36,
    "Name": "Oklahoma"
}, {
    "ID": 37,
    "Name": "Oregon"
}, {
    "ID": 38,
    "Name": "Pennsylvania"
}, {
    "ID": 39,
    "Name": "Rhode Island"
}, {
    "ID": 40,
    "Name": "South Carolina"
}, {
    "ID": 41,
    "Name": "South Dakota"
}, {
    "ID": 42,
    "Name": "Tennessee"
}, {
    "ID": 43,
    "Name": "Texas"
}, {
    "ID": 44,
    "Name": "Utah"
}, {
    "ID": 45,
    "Name": "Vermont"
}, {
    "ID": 46,
    "Name": "Virginia"
}, {
    "ID": 47,
    "Name": "Washington"
}, {
    "ID": 48,
    "Name": "West Virginia"
}, {
    "ID": 49,
    "Name": "Wisconsin"
}, {
    "ID": 50,
    "Name": "Wyoming"
}, {
    "ID": 51,
    "Name": "North Dakota"
}];