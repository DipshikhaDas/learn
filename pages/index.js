import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://horrible:XVd5mCF2TBeyXDtt@cluster0.itehw1i.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context){
//   const req = context.req
//   const res = context.res

//   console.log("requeset", req, "response ",res)
//   return{
//     props: {
//       meetups: Dummy
//     }
//   }
// }
