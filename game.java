import java.util.*;
// https://www.youtube.com/watch?v=_ca1Zfg6CrQ

public class game{
    // Cloning the database so that it can be added to later on
    private static ArrayList clonedDatabase = new ArrayList();
    public static void main(String[] args){
        // Character Creation - HashMap is a way to store it as a database
        HashMap<String, Object> c1 = new HashMap<>();
        // Only name will be stored as a string
        c1.put("name", "Iron Man");
        // Every other variable will be stored as a boolean value
        c1.put("human", true);
        c1.put("youtube", false);
        c1.put("movie", true);
        c1.put("book", true);
        c1.put("female", false);

        // Creating more characters
        HashMap<String, Object> c2 = new HashMap<>();
        c2.put("name", "Zeus");
        c2.put("human", false);
        c2.put("youtube", false);
        c2.put("movie", true);
        c2.put("book", true);
        c2.put("female", false);

        HashMap<String, Object> c3 = new HashMap<>();
        c3.put("name", "Steven Hawking");
        c3.put("human", true);
        c3.put("youtube", false);
        c3.put("movie", false);
        c3.put("book", true);
        c3.put("female", false);

        HashMap<String, Object> c4 = new HashMap<>();
        c4.put("name", "Aphrodite");
        c4.put("human", false);
        c4.put("youtube", false);
        c4.put("movie", true);
        c4.put("book", true);
        c4.put("female", true);

        HashMap<String, Object> c5 = new HashMap<>();
        c5.put("name", "Homer Simpson");
        c5.put("human", false);
        c5.put("youtube", false);
        c5.put("movie", true);
        c5.put("book", false);
        c5.put("female", false);

        HashMap<String, Object> c6 = new HashMap<>();
        c6.put("name", "Madison Beer");
        c6.put("human", true);
        c6.put("youtube", false);
        c6.put("movie", false);
        c6.put("book", false);
        c6.put("female", true);

        HashMap<String, Object> c7 = new HashMap<>();
        c7.put("name", "Lionel Messi");
        c7.put("human", true);
        c7.put("youtube", false);
        c7.put("movie", false);
        c7.put("book", true);
        c7.put("female", false);

        // Creating the database
        ArrayList database = new ArrayList();
        // Adds it to the database
        database.add(c1);
        database.add(c2);
        database.add(c3);
        database.add(c4);
        database.add(c5);
        database.add(c6);
        database.add(c7);
        // Using an interator tool to loop through the database and add all the data into the cloned database
        Iterator it = database.iterator();
        while (it.hasNext()){
            clonedDatabase.add(it.next());
        }

        System.out.println("Cloned list: " + clonedDatabase.size());

        // Creates the Questions and reads the Answers
        System.out.println("Welcome to Akinator!!!");
        System.out.println("Please answer the questions via numbers (1 - yes and 0 - no)");
        Scanner sc = new Scanner(System.in);

        System.out.println("Is your character Human?");

        take_Input(sc.nextInt(), "human", database);

        System.out.println("Is your character a Youtuber?");
        take_Input(sc.nextInt(), "youtube", database);

        System.out.println("Is your character in a Movie?");
        take_Input(sc.nextInt(), "movie", database);

        System.out.println("Is your character in a Book?");
        take_Input(sc.nextInt(), "book", database);

        System.out.println("Is your character Female?");
        take_Input(sc.nextInt(),"female", database);
        sc.close();
    }
    // Reads what the user inputted and convers to boolean form
    public static boolean reader(String choice){
        return choice.equals("yes") || choice.equals("Yes") || choice.equals("y") || choice.equals("Y");
    }
    // Allows the user to add a new character to the database
    public static ArrayList addData(ArrayList clonedDatabase){
        // Gets the required data from user
        Scanner read = new Scanner(System.in);
        System.out.println("What is your character's name?");
        String name = read.next();
        System.out.println("Is "+name+" a human? (Yes or No)");
        String human = read.next();
        System.out.println("Is "+name+" a youtuber? (Yes or No)");
        String youtube = read.next();
        System.out.println("Is "+name+" in a movie? (Yes or No)");
        String movie = read.next();
        System.out.println("Is "+name+" in a book? (Yes or No)");
        String book = read.next();
        System.out.println("Is "+name+" a female? (Yes or No)");
        String female = read.next();
        read.close();
        // Creation of the hashmap
        HashMap<String, Object> adder = new HashMap<>();
        adder.put("name", name);
        adder.put("human", reader(human));
        adder.put("youtube", reader(youtube));
        adder.put("movie", reader(movie));
        adder.put("book", reader(book));
        adder.put("female", reader(female));
        // Adds the new character to the existing database
        clonedDatabase.add(adder);
        return clonedDatabase;
    }
    // Function for printing out the new databse after data has been inserted
    public static ArrayList PrintFunction(ArrayList database){
        Iterator itra = database.iterator();
        // Outputs the whole collection of Hash Maps
        while (itra.hasNext()){
            String obj = itra.next().toString();
	        System.out.println(obj);
        }
        return database;
    }

    public static void take_Input(int answer, String property, ArrayList database){
        // Checks if it matches the property, if not then it ignores it
        boolean ans;
        if(answer == 1){
            ans = true;
        }
        else{
            ans=false;
        }

        ArrayList remove = new ArrayList();
        // Checks if the value is in the database and if it is then it is deleted
        for(Object value : database){
            HashMap characters = (HashMap) value;
            boolean prop = (boolean) characters.get(property);
            if(prop != ans){
                remove.add(characters);
            }
        }
        // Removes from the database
        for (Object del : remove){
            database.remove(del);
        }

        // Checks if there is only one data left in the database
        if(database.size() == 1){
            HashMap characters = (HashMap) database.get(0);
            String output = (String) characters.get("name").toString();
            System.out.println("Your thinking of "+ output);
            System.exit(0);
        }
        // If the program fails then certain failsafes are put in place
        if(property=="female" && database.size() !=1){
            // Checks if the person is in the database. If not, then the user can add them to the database
            if(database.size()==0){
                System.out.println("Sorry the person you are thinking of is not in the database :(");
                // Option of the user to add a new person to the database
                System.out.println("Would you like to add them to the database?");
                Scanner read = new Scanner(System.in);
                String r = read.nextLine();
                if(r.equals("yes") || r.equals("Yes") || r.equals("y") || r.equals("Y")){
                    System.out.println("You have opted to add to the database :)");
                    // Adds the values
                    game.addData(clonedDatabase);
                    game.PrintFunction(clonedDatabase);
                }
                read.close();
                System.exit(0);
            }
            // If there are several people with the same format, then it outputs all of them
            else{
                System.out.println(database.size());
                int count = 1;
                for(int i=0; i<database.size(); i++){
                    // Output for the final person
                    if(count==database.size()){
                        HashMap characters = (HashMap) database.get(i);
                        String output = (String) characters.get("name").toString();
                        System.out.println("Else your thinking of "+ output+".");
                        System.out.println("Looks like you beat me this time :(");
                        System.out.println("I will beat you next time.");
                        System.exit(0);
                    }
                    // Lists everyone else that is not the last person
                    else{
                        HashMap characters = (HashMap) database.get(i);
                        String output = (String) characters.get("name").toString();
                        System.out.println("Your thinking of "+ output+" or");
                    }
                    count++;
                }
            }
        }
    }
}