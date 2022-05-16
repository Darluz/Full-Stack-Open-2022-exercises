const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  );
};

function Part(props) {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
}

function Content({ exercises }) {
  return (
    <div>
      {exercises.map((ex) => (
        <Part key={ex.id} part={ex.name} exercise={ex.exercises} />
      ))}
    </div>
  );
}

const Total = ({ exercises }) => {
  return (
    <>
      <p>
        <b>{`total of ${exercises.reduce(
          (values, ex) => values + ex.exercises,
          0
        )} exercises`}</b>
      </p>
    </>
  );
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total exercises={course.parts} />
    </div>
  ));
};

export default Course