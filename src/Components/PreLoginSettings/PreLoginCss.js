import styled from "styled-components";

export const PreLoginCSs = styled.section`

height: 100vh;
background-image: url("https://img.freepik.com/premium-vector/bitcoin-concept_34629-80.jpg?w=740");
background-repeat: no-repeat;
background-position: center;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color:#fff;
*:focus{
    outline:0;
}

.main_body{
backdrop-filter: blur(3px);
display: flex;
flex-direction: column;
gap: 10px;
padding: 20px;
border: 2px solid #fff;
}

.child1{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width:100% ;
  select{
    padding: 5px;
    border-radius: 5px;
  }
}

.child2{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width:100%;
}

.grandchild2{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width:100% ;
  }

.error{
  border: 1px solid red;
  :focus{
    outline:1px solid red !important;
    }
  }

.error.no{
  border: 0;
  :focus{
    outline: 0 !important;
  }
}

.perr{
  display: block;
  color: red;
  font-weight: bolder;

}
.perr.no{
  display: none;
}

.btn{
  height: 30px;
  background-color: #35608e;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 3px;
  :hover{
      background-color: #283895;
  }
}

input{
      padding: 5px;
      border-radius: 5px;
    }
h2{
    margin:0;
}

`