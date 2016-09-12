import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';

const superHeroSource = ["Superman", "Batman", "The Flash", "Green Arrow"];

class demo extends Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        row1 != row2;
      }
    });

    this.heroRef = superHeroSource;//reference the array

    this.state = {
      superHero: '',
      heroSource: dataSource.cloneWithRows(this.heroRef)//clone the superhero array
    };
  }

  addHero() {
    if ( this.state.superHero !== '' ) {
      this.heroRef.push(this.state.superHero);//push new array
    }

    this.setState({
      superHero: '',
      heroSource: this.state.heroSource.cloneWithRows(this.heroRef)//update the array
    });
  }

  removeHero(rowData) {
    this.heroRef.splice(rowData, 1);

    this.setState({
      heroSource: this.state.heroSource.cloneWithRows(this.heroRef)
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Super Hero Lists
          </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({superHero: text})} value={this.state.superHero}/>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.addHero()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Add!</Text>
          </TouchableHighlight>
        </View>
        <ListView dataSource={this.state.heroSource} renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }

  //render the listview
  renderRow(rowData, sectionID ,rowID) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeHero(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.todoText}>{rowData}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

AppRegistry.registerComponent('demo', () => demo);
