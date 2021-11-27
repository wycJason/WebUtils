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

const employeesSubTable = JSON.parse(JSON.stringify(employees));

const states = [{
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

const treeProducts = [{
        "ID": 1,
        "name": "Stores",
        "expanded": true
    },
    {
        "ID": "1_1",
        "categoryId": 1,
        "name": "Super Mart of the West",
        "expanded": true
    },
    {
        "ID": "1_1_1",
        "categoryId": "1_1",
        "name": "Video Players"
    },
    {
        "ID": "1_1_1_1",
        "categoryId": "1_1_1",
        "name": "HD Video Player",
        "price": 220
    },
    {
        "ID": "1_1_1_2",
        "categoryId": "1_1_1",
        "name": "SuperHD Video Player",
        "price": 270
    },
    {
        "ID": "1_1_2",
        "categoryId": "1_1",
        "name": "Televisions",
        "expanded": true
    },
    {
        "ID": "1_1_2_1",
        "categoryId": "1_1_2",
        "name": "SuperLCD 42",
        "price": 1200
    },
    {
        "ID": "1_1_2_2",
        "categoryId": "1_1_2",
        "name": "SuperLED 42",
        "price": 1450
    },
    {
        "ID": "1_1_2_3",
        "categoryId": "1_1_2",
        "name": "SuperLED 50",
        "price": 1600
    },
    {
        "ID": "1_1_2_4",
        "categoryId": "1_1_2",
        "name": "SuperLCD 55",
        "price": 1750
    },
    {
        "ID": "1_1_2_5",
        "categoryId": "1_1_2",
        "name": "SuperLCD 70",
        "price": 4000
    },
    {
        "ID": "1_1_3",
        "categoryId": "1_1",
        "name": "Monitors"
    },
    {
        "ID": "1_1_3_1",
        "categoryId": "1_1_3",
        "name": "19\""
    },
    {
        "ID": "1_1_3_1_1",
        "categoryId": "1_1_3_1",
        "name": "DesktopLCD 19",
        "price": 160
    },
    {
        "ID": "1_1_4",
        "categoryId": "1_1",
        "name": "Projectors"
    },
    {
        "ID": "1_1_4_1",
        "categoryId": "1_1_4",
        "name": "Projector Plus",
        "price": 550
    },
    {
        "ID": "1_1_4_2",
        "categoryId": "1_1_4",
        "name": "Projector PlusHD",
        "price": 750
    }
];

const customers = [{
    "ID": 1,
    "CompanyName": "Premier Buy",
    "Address": "7601 Penn Avenue South",
    "City": "Richfield",
    "State": "Minnesota",
    "Zipcode": 55423,
    "Phone": "(612) 291-1000",
    "Fax": "(612) 291-2001",
    "Website": "http://www.nowebsitepremierbuy.com"
}, {
    "ID": 2,
    "CompanyName": "ElectrixMax",
    "Address": "263 Shuman Blvd",
    "City": "Naperville",
    "State": "Illinois",
    "Zipcode": 60563,
    "Phone": "(630) 438-7800",
    "Fax": "(630) 438-7801",
    "Website": "http://www.nowebsiteelectrixmax.com"
}, {
    "ID": 3,
    "CompanyName": "Video Emporium",
    "Address": "1201 Elm Street",
    "City": "Dallas",
    "State": "Texas",
    "Zipcode": 75270,
    "Phone": "(214) 854-3000",
    "Fax": "(214) 854-3001",
    "Website": "http://www.nowebsitevideoemporium.com"
}, {
    "ID": 4,
    "CompanyName": "Screen Shop",
    "Address": "1000 Lowes Blvd",
    "City": "Mooresville",
    "State": "North Carolina",
    "Zipcode": 28117,
    "Phone": "(800) 445-6937",
    "Fax": "(800) 445-6938",
    "Website": "http://www.nowebsitescreenshop.com"
}, {
    "ID": 5,
    "CompanyName": "Braeburn",
    "Address": "1 Infinite Loop",
    "City": "Cupertino",
    "State": "California",
    "Zipcode": 95014,
    "Phone": "(408) 996-1010",
    "Fax": "(408) 996-1012",
    "Website": "http://www.nowebsitebraeburn.com"
}, {
    "ID": 6,
    "CompanyName": "PriceCo",
    "Address": "30 Hunter Lane",
    "City": "Camp Hill",
    "State": "Pennsylvania",
    "Zipcode": 17011,
    "Phone": "(717) 761-2633",
    "Fax": "(717) 761-2334",
    "Website": "http://www.nowebsitepriceco.com"
}, {
    "ID": 7,
    "CompanyName": "Ultimate Gadget",
    "Address": "1557 Watson Blvd",
    "City": "Warner Robbins",
    "State": "Georgia",
    "Zipcode": 31093,
    "Phone": "(995) 623-6785",
    "Fax": "(995) 623-6786",
    "Website": "http://www.nowebsiteultimategadget.com"
}, {
    "ID": 8,
    "CompanyName": "EZ Stop",
    "Address": "618 Michillinda Ave.",
    "City": "Arcadia",
    "State": "California",
    "Zipcode": 91007,
    "Phone": "(626) 265-8632",
    "Fax": "(626) 265-8633",
    "Website": "http://www.nowebsiteezstop.com"
}, {
    "ID": 9,
    "CompanyName": "Clicker",
    "Address": "1100 W. Artesia Blvd.",
    "City": "Compton",
    "State": "California",
    "Zipcode": 90220,
    "Phone": "(310) 884-9000",
    "Fax": "(310) 884-9001",
    "Website": "http://www.nowebsiteclicker.com"
}, {
    "ID": 10,
    "CompanyName": "Store of America",
    "Address": "2401 Utah Ave. South",
    "City": "Seattle",
    "State": "Washington",
    "Zipcode": 98134,
    "Phone": "(206) 447-1575",
    "Fax": "(206) 447-1576",
    "Website": "http://www.nowebsiteamerica.com"
}, {
    "ID": 11,
    "CompanyName": "Zone Toys",
    "Address": "1945 S Cienega Boulevard",
    "City": "Los Angeles",
    "State": "California",
    "Zipcode": 90034,
    "Phone": "(310) 237-5642",
    "Fax": "(310) 237-5643",
    "Website": "http://www.nowebsitezonetoys.com"
}, {
    "ID": 12,
    "CompanyName": "ACME",
    "Address": "2525 E El Segundo Blvd",
    "City": "El Segundo",
    "State": "California",
    "Zipcode": 90245,
    "Phone": "(310) 536-0611",
    "Fax": "(310) 536-0612",
    "Website": "http://www.nowebsiteacme.com"
}]