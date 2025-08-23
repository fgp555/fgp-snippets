import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { JSX } from "react/jsx-runtime";

const { width } = Dimensions.get("window");

// Tipos para las props del componente
interface CustomDatePickerProps {
  value?: Date | null;
  onDateChange?: (date: Date) => void;
  placeholder?: string;
  dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  minimumDate?: Date;
  maximumDate?: Date;
  style?: ViewStyle;
  disabled?: boolean;
}

// Tipos para los estilos
interface Styles {
  container: ViewStyle;
  dateButton: ViewStyle;
  disabledButton: ViewStyle;
  placeholderButton: ViewStyle;
  dateText: TextStyle;
  disabledText: TextStyle;
  placeholderText: TextStyle;
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalHeader: ViewStyle;
  modalTitle: TextStyle;
  modalButton: ViewStyle;
  modalButtonText: TextStyle;
  confirmButton: TextStyle;
  calendarHeader: ViewStyle;
  navButton: ViewStyle;
  navButtonText: TextStyle;
  monthYearText: TextStyle;
  weekDaysContainer: ViewStyle;
  weekDayContainer: ViewStyle;
  weekDayText: TextStyle;
  calendarContainer: ViewStyle;
  dayContainer: ViewStyle;
  dayButton: ViewStyle;
  selectedDay: ViewStyle;
  disabledDay: ViewStyle;
  emptyDay: ViewStyle;
  dayText: TextStyle;
  selectedDayText: TextStyle;
  disabledDayText: TextStyle;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value = null,
  onDateChange,
  placeholder = "Seleccionar fecha",
  dateFormat = "DD/MM/YYYY",
  minimumDate,
  maximumDate,
  style,
  disabled = false,
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const currentDate: Date = selectedDate || new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());

  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const weekDays: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;

    const day: string = date.getDate().toString().padStart(2, "0");
    const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
    const year: number = date.getFullYear();

    switch (dateFormat) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      default:
        return date.toLocaleDateString("es-ES");
    }
  };

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minimumDate && date < minimumDate) return true;
    if (maximumDate && date > maximumDate) return true;
    return false;
  };

  const renderCalendar = (): JSX.Element[] => {
    const daysInMonth: number = getDaysInMonth(currentMonth, currentYear);
    const firstDay: number = getFirstDayOfMonth(currentMonth, currentYear);
    const days: JSX.Element[] = [];

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayContainer}>
          <View style={styles.emptyDay} />
        </View>
      );
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date: Date = new Date(currentYear, currentMonth, day);
      const isSelected: boolean =
        selectedDate !== null &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      const isDisabled: boolean = isDateDisabled(date);

      days.push(
        <View key={day} style={styles.dayContainer}>
          <TouchableOpacity
            style={[styles.dayButton, isSelected && styles.selectedDay, isDisabled && styles.disabledDay]}
            onPress={() => !isDisabled && handleDateSelect(date)}
            disabled={isDisabled}
          >
            <Text style={[styles.dayText, isSelected && styles.selectedDayText, isDisabled && styles.disabledDayText]}>
              {day}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return days;
  };

  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
    onDateChange && onDateChange(date);
    setShowPicker(false);
  };

  const navigateMonth = (direction: "prev" | "next"): void => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const openPicker = (): void => {
    if (!disabled) {
      // Si no hay fecha seleccionada, usar la fecha actual para mostrar el calendario
      if (!selectedDate) {
        const today: Date = new Date();
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
      }
      setShowPicker(true);
    }
  };

  const closePicker = (): void => {
    setShowPicker(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.dateButton, disabled && styles.disabledButton, !selectedDate && styles.placeholderButton]}
        onPress={openPicker}
        disabled={disabled}
      >
        <Text style={[styles.dateText, disabled && styles.disabledText, !selectedDate && styles.placeholderText]}>
          {formatDate(selectedDate)}
        </Text>
      </TouchableOpacity>

      <Modal transparent={true} animationType="slide" visible={showPicker} onRequestClose={closePicker}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={closePicker}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => {}}>
            {/* Header del calendario */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth("prev")}>
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthYearText}>
                {months[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth("next")}>
                <Text style={styles.navButtonText}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Días de la semana */}
            <View style={styles.weekDaysContainer}>
              {weekDays.map((day: string, index: number) => (
                <View key={index} style={styles.weekDayContainer}>
                  <Text style={styles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendario */}
            <View style={styles.calendarContainer}>{renderCalendar()}</View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    width: "100%",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ff69b4",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#ff69b4",
    minHeight: 48,
    justifyContent: "center",
    shadowColor: "#ff69b4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#ffb3d9",
    borderColor: "#ffb3d9",
    opacity: 0.6,
  },
  placeholderButton: {
    borderColor: "#ff69b4",
    backgroundColor: "#ffcce5",
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  disabledText: {
    color: "#fff",
    opacity: 0.8,
  },
  placeholderText: {
    color: "#cc0066",
    fontStyle: "italic",
    fontWeight: "400",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 105, 180, 0.3)",
  },
  modalContent: {
    backgroundColor: "#ff69b4",
    borderRadius: 20,
    width: width * 0.9,
    maxWidth: 350,
    overflow: "hidden",
  },
  modalHeader: {
    display: "none",
  },
  modalTitle: {
    display: "none",
  },
  modalButton: {
    display: "none",
  },
  modalButtonText: {
    display: "none",
  },
  confirmButton: {
    display: "none",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ff69b4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  navButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  weekDaysContainer: {
    flexDirection: "row",
    backgroundColor: "#ffcce5",
    paddingVertical: 10,
  },
  weekDayContainer: {
    flex: 1,
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#cc0066",
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ff69b4",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  dayContainer: {
    width: `${100 / 7}%` as any,
    aspectRatio: 1,
    padding: 2,
  },
  dayButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  selectedDay: {
    backgroundColor: "#fff",
    shadowColor: "#ff69b4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledDay: {
    opacity: 0.3,
  },
  emptyDay: {
    flex: 1,
  },
  dayText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  selectedDayText: {
    color: "#ff69b4",
    fontWeight: "700",
  },
  disabledDayText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});

// Ejemplo de uso del componente
interface AppState {
  selectedDate: Date | null;
  selectedDate2: Date | null;
}

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);

  const handleDateChange = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleDateChange2 = (date: Date): void => {
    setSelectedDate2(date);
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Date Picker Rosa Personalizado</Text>

      <View style={appStyles.section}>
        <Text style={appStyles.label}>Fecha con valor inicial:</Text>
        <CustomDatePicker
          value={selectedDate}
          onDateChange={handleDateChange}
          placeholder="Selecciona una fecha"
          dateFormat="DD/MM/YYYY"
          minimumDate={new Date(2020, 0, 1)}
          maximumDate={new Date(2030, 11, 31)}
        />
        <Text style={appStyles.result}>
          Fecha seleccionada: {selectedDate ? selectedDate.toLocaleDateString("es-ES") : "Ninguna"}
        </Text>
      </View>

      <View style={appStyles.section}>
        <Text style={appStyles.label}>Fecha sin valor inicial:</Text>
        <CustomDatePicker
          value={selectedDate2}
          onDateChange={handleDateChange2}
          placeholder="Toca para seleccionar fecha"
          dateFormat="DD/MM/YYYY"
        />
        <Text style={appStyles.result}>
          Fecha seleccionada: {selectedDate2 ? selectedDate2.toLocaleDateString("es-ES") : "Ninguna"}
        </Text>
      </View>

      <View style={appStyles.section}>
        <Text style={appStyles.label}>Date Picker Deshabilitado:</Text>
        <CustomDatePicker value={new Date()} placeholder="Campo deshabilitado" disabled={true} />
      </View>
    </View>
  );
};

interface AppStyles {
  container: ViewStyle;
  title: TextStyle;
  section: ViewStyle;
  label: TextStyle;
  result: TextStyle;
}

const appStyles = StyleSheet.create<AppStyles>({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffe6f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#cc0066",
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#cc0066",
  },
  result: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});

export default App;

/* 
      <View>
        <Text>Fecha con valor inicial:</Text>
        <CustomDatePicker
          value={new Date(2023, 11, 25)}
          onDateChange={(date) => console.log("Fecha seleccionada:", date)}
          placeholder="Selecciona una fecha"
          dateFormat="DD/MM/YYYY"
          minimumDate={new Date(2020, 0, 1)}
          maximumDate={new Date(2030, 11, 31)}
        />
      </View>
*/
