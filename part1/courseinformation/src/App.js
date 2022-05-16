const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
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

function Content(props) {
  return (
    <div>
      <Part
        part={props.exercises[0].name}
        exercise={props.exercises[0].exercises}
      />
      <Part
        part={props.exercises[1].name}
        exercise={props.exercises[1].exercises}
      />
      <Part
        part={props.exercises[2].name}
        exercise={props.exercises[2].exercises}
      />
    </div>
  );
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.exercises[0].exercises +
          props.exercises[1].exercises +
          props.exercises[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default App;
